"use client";

import React, { useEffect, useMemo, useRef, useState, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
  ColumnDef,
  Row,
} from "@tanstack/react-table";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { deleteTask, reorderTasks } from "@/slices/tasksSlice";
import ConfirmationModal from "./viewTask/confimationModal";
import ViewTask from "./viewTask/page";

// Define Task and Subtask types
interface Subtask {
  id?: string;
  name: string;
}

export interface Task {
  id: string;
  name: string;
  project: string;
  owner: string;
  subtasks?: Subtask[];
}

// SortableRow component
interface SortableRowProps {
  row: Row<Task>;
  children: React.ReactNode;
}

const SortableRow = forwardRef<HTMLTableRowElement, SortableRowProps>(
  ({ row, children }, ref) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: row.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      cursor: "grab",
      background: "transparent",
    };

    return (
      <tr
        ref={(node) => {
          setNodeRef(node);
    if (ref && typeof ref === "object") ref.current = node;
        }}
        style={style}
        {...attributes}
        {...listeners}
        className="group"
      >
        {children}
      </tr>
    );
  }
);

export default function TaskLists() {
const tasks = useSelector((state: any) => state.tasks);
  const dispatch = useDispatch();
  const lastTaskRef = useRef<HTMLTableRowElement | null>(null);

  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (lastTaskRef.current) {
      lastTaskRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [tasks]);
useEffect(() => {
  if (typeof window !== "undefined") {
    localStorage.setItem("tasks_data", JSON.stringify(tasks));
  }
}, [tasks]);
  const columns = useMemo<ColumnDef<Task, any>[]>(
    () => [
      {
        id: "delete",
        header: () => null,
        cell: ({ row }) => (
          <button
            onClick={() => {
              setDeletePopup(true);
              setDeleteId(row.original.id);
            }}
            style={{ cursor: "pointer", background: "transparent" }}
            className="w-[20px] h-[20px] flex justify-center items-center opacity-0 group-hover:opacity-100"
          >
            <DeleteOutlinedIcon className="text-[#696969]" />
          </button>
        ),
        size: 40,
      },
      { accessorKey: "id", header: "ID", size: 140 },
      {
        accessorKey: "name",
        header: "Task Name",
        size: 420,
        cell: ({ row, getValue }) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className="flex relative">
              {row.getCanExpand() ? (
                <button
                  onClick={row.getToggleExpandedHandler()}
                  style={{
                    cursor: "pointer",
                    background: "transparent",
                    border: "1px solid lightgray",
                  }}
                  className="w-[20px] h-[20px] flex justify-center items-center absolute"
                >
                  {row.getIsExpanded() ? "-" : "+"}
                </button>
              ) : null}
              <span className="ml-[50px]">{getValue() as string}</span>
            </p>
            <button
              onClick={() => setSelectedTask(row.original)}
              style={{
                marginLeft: 8,
                padding: "2px 6px",
                cursor: "pointer",
                color: "#007bff",
                border: "1px solid #007bff",
                borderRadius: 4,
                fontSize: 12,
              }}
            >
              View
            </button>
          </div>
        ),
      },
      { accessorKey: "project", header: "Project", size: 260 },
      { accessorKey: "owner", header: "Owner", size: 160 },
    ],
    []
  );

  const [columnSizing, setColumnSizing] = useState({});

  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) =>
      row.subtasks
        ? row.subtasks.map((st) => ({ ...st, project: row.project, owner: row.owner }))
        : [],
    getRowId: (row) => row.id,
    columnResizeMode: "onChange",
    state: { columnSizing },
    onColumnSizingChange: setColumnSizing,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor)
  );

  const topLevelIds = useMemo(() => tasks.map((d:any) => d.id), [tasks]);
  const allRowIds = useMemo(() => table.getRowModel().rows.map((r) => r.id), [table]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    if (!allRowIds.includes(active.id.toString()) || !allRowIds.includes(over.id.toString())) return;

    const oldIndex = tasks.findIndex((t:any) => t.id === active.id);
    const newIndex = tasks.findIndex((t:any) => t.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    dispatch(reorderTasks({ oldIndex, newIndex }));
  };

  const renderCell = (cell: any, row: Row<Task>) => {
    const depth = row.depth ?? 0;
    const firstCell =
      cell.column.id === "expander" || cell.column.id === "id" || cell.column.id === "name";
    const paddingLeft = depth > 0 && firstCell ? `${depth * 18}px` : undefined;
    return <div style={{ paddingLeft }}>{flexRender(cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey, cell.getContext())}</div>;
  };

  return (
    <div style={{ padding: 12, overflowY: "auto", height: "400px" }}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => {
                  const width = header.getSize() ?? header.column.columnDef.size ?? 120;
                  return (
                    <th
                      key={header.id}
                      style={{
                        border: "1px solid #e6e6e6",
                        padding: "8px",
                        width,
                        minWidth: 50,
                        position: "relative",
                        background: "transparent",
                        textAlign: "left",
                        overflow: "hidden",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                      <div
                        {...{
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                        }}
                        style={{
                          position: "absolute",
                          right: 0,
                          top: 0,
                          bottom: 0,
                          width: 8,
                          cursor: "col-resize",
                          zIndex: 10,
                        }}
                      />
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <SortableContext items={topLevelIds} strategy={verticalListSortingStrategy}>
            <tbody>
              {table.getRowModel().rows.map((row, index) => {
                const isLast = index === table.getRowModel().rows.length - 1;
                const isTop = (row.depth ?? 0) === 0;
                const rowStyle = isTop
                  ? { border: "1px solid #f0f0f0", padding: 10, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
                  : { border: "1px solid #f7f7f7", padding: 10, background: "#fff", fontSize: 14 };

                return isTop ? (
                  <SortableRow key={row.id} row={row} ref={isLast ? lastTaskRef : null}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        className="!bg-transparent"
                        key={cell.id}
                        style={{ ...rowStyle, width: cell.column.getSize() ?? cell.column.columnDef.size ?? 120 }}
                      >
                        {renderCell(cell, row)}
                      </td>
                    ))}
                  </SortableRow>
                ) : (
                  <tr key={row.id} className="group">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        className="relative !bg-transparent"
                        key={cell.id}
                        style={{ ...rowStyle, width: cell.column.getSize() ?? cell.column.columnDef.size ?? 120 }}
                      >
                        {renderCell(cell, row)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </SortableContext>
        </table>
      </DndContext>

      {selectedTask && <ViewTask setSelectedTask={setSelectedTask} selectedTask={selectedTask} />}
      {deletePopup && <ConfirmationModal id={deleteId} open={deletePopup} setOpen={setDeletePopup} />}
    </div>
  );
}
