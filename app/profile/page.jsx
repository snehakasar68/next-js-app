"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Profile() {
  const { data: session, status, update } = useSession();
  
  const [profileImage, setProfileImage] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.image) {
      setProfileImage(session.user.image);
    }
  }, [status, session]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <p>Not logged in</p>;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!profileFile) return;

    const formData = new FormData();
    formData.append("id", session?.user.id ?? ""); 
    formData.append("profileImage", profileFile); 

    const res = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/users/upload`, {
      method: "PATCH",
      body: formData,
    });

    if (res.ok) {
      const updatedUser = await res.json();
      await update({
        ...session,
        user: { ...session?.user, image: updatedUser.profileImage },
      });
      setProfileImage(updatedUser.profileImage);
      setProfileFile(null);
    } else {
      const error = await res.json();
      console.error(error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2>Hello {session?.user?.name}</h2>
      <p>Email: {session?.user?.email}</p>

      <input type="file" onChange={handleFileChange} />
      
      {profileImage && (
        <Image
          src={profileImage}
          alt="Profile Image"
          width={1200}
          height={150}
          className=""
        />
      )}

      <button
        onClick={handleSave}
        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}
