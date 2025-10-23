"use client";

import { useMockRole, Role } from "@/hooks/use-mock-role";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";

export const RoleSwitcher = () => {
    const { role, setRole } = useMockRole();
    const router = useRouter();

    const handleRoleChange = (newRole: Role) => {
        setRole(newRole);
        
        // Navigate to the correct default page for the selected role
        let path = '/';
        if (newRole === 'agency-owner') {
            path = '/client-map';
        } else if (newRole === 'va') {
            path = '/va-dashboard';
        } else if (newRole === 'client') {
            path = '/client-dashboard';
        }
        router.push(path);
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