"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, UserCog, Ban, Key, History } from "lucide-react";
import { useState } from "react";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "employee" | "promoter";
  status: "active" | "inactive";
  hireDate: string;
  lastShift: string;
}

const mockStaff: StaffMember[] = [
  {
    id: "1",
    name: "Chris V.",
    email: "chris.v@barbus-gr.com",
    role: "admin",
    status: "active",
    hireDate: "2024-01-01",
    lastShift: "2024-03-20"
  },
  {
    id: "2",
    name: "John Smith",
    email: "john@barbus-gr.com",
    role: "employee",
    status: "active",
    hireDate: "2024-02-15",
    lastShift: "2024-03-19"
  }
];

interface StaffTableProps {
  searchTerm: string;
}

export function StaffTable({ searchTerm }: StaffTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredStaff = mockStaff.filter(staff =>
    Object.values(staff).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStaff = filteredStaff.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="rounded-md border border-purple-800/30">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Hire Date</TableHead>
              <TableHead>Last Shift</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedStaff.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell className="font-medium">{staff.name}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-purple-300 border-purple-800">
                    {staff.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={staff.status === "active" ? "success" : "destructive"}>
                    {staff.status}
                  </Badge>
                </TableCell>
                <TableCell>{staff.hireDate}</TableCell>
                <TableCell>{staff.lastShift}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-black/90 border-purple-800/30">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <UserCog className="mr-2 h-4 w-4" />
                        Edit Staff
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Key className="mr-2 h-4 w-4" />
                        Reset Password
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <History className="mr-2 h-4 w-4" />
                        View Shifts
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        <Ban className="mr-2 h-4 w-4" />
                        Deactivate
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="border-purple-800/30 text-purple-300"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="border-purple-800/30 text-purple-300"
        >
          Next
        </Button>
      </div>
    </div>
  );
}