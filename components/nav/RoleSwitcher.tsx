"use client";

import { useMockRole, Role } from "@/hooks/use-mock-role";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";

export const RoleSwitcher = () => {
    const { role, setRole } = useMockRole();

    const handleRoleChange = (newRole: Role) => {
        // In a real app, you might redirect, but here we just switch context
        // and rely on Next.js to re-render the correct layout.
        // A page reload helps ensure the correct layout is shown if navigation is complex.
        setRole(newRole);
        window.location.href = '/client-map'; // A common entry point
    };

    return (
        <div className="flex items-center gap-2">
            <Label htmlFor="role-switcher" className="text-sm font-medium">View as:</Label>
            <Select value={role} onValueChange={(value) => handleRoleChange(value as Role)}>
                <SelectTrigger id="role-switcher" className="w-[180px] h-9">
                    <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="agency-owner">Agency Owner</SelectItem>
                    <SelectItem value="va">Virtual Assistant</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};