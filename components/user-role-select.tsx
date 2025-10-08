"use client";

import { admin } from "@/lib/auth-client";
import { UserRole } from "@/lib/generated/prisma";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface UserRoleSelectProps {
  userId: string;
  role: UserRole;
}

const UserRoleSelect = ({ userId, role }: UserRoleSelectProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    const newRole = evt.target.value as UserRole;

    const canChangeRole = await admin.hasPermission({
      permissions: {
        user: ["set-role"],
      },
    });
	
    //console.log("CanChangeRole:::::::::::::::::", canChangeRole);
    if (canChangeRole.error || canChangeRole.data?.success === false) {
      return toast.error("Forbidden");
    }

    await admin.setRole({
      userId,
      role: newRole,
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("User role updated");
          router.refresh();
        },
      },
    });
  }

  return (
    <select
      value={role}
      onChange={handleChange}
      disabled={role === "ADMIN" || isPending}
      className="px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option className="bg-black text-white" value="ADMIN">
        ADMIN
      </option>
      <option className="bg-black text-white" value="USER">
        USER
      </option>
    </select>
  );
};

export default UserRoleSelect;
