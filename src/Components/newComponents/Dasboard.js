/**
 * v0 by Vercel.
 * @see https://v0.dev/t/oS0CvsNoUTv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Dasboard() {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="flex items-center justify-between p-4 bg-green-100">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold">Buben Club</h1>
                    <nav className="flex space-x-4">
                        <Link href="#" className="text-lg font-medium text-green-700" prefetch={false}>
                            Club Room
                        </Link>
                        <Link href="#" className="text-lg font-medium text-gray-700" prefetch={false}>
                            Study Room
                        </Link>
                        <Link href="#" className="text-lg font-medium text-gray-700" prefetch={false}>
                            Grillcentrum
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="outline">Invitations</Button>
                    <Button variant="default">Log out</Button>
                </div>
            </header>
            <main className="flex flex-col p-4 space-y-4">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">Your Reservations</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-left">Room</th>
                                <th className="px-4 py-2 text-left">Start Date</th>
                                <th className="px-4 py-2 text-left">End Date</th>
                                <th className="px-4 py-2 text-left">Purpose</th>
                                <th className="px-4 py-2 text-left">Guests</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="px-4 py-2">Meeting Room</td>
                                <td className="px-4 py-2">September 15, 2024</td>
                                <td className="px-4 py-2">September 15, 2024</td>
                                <td className="px-4 py-2">Team Meeting</td>
                                <td className="px-4 py-2">10</td>
                                <td className="px-4 py-2">john@example.com</td>
                                <td className="px-4 py-2">
                                    <Badge variant="outline" className="bg-green-200 text-green-700">
                                        Approved
                                    </Badge>
                                </td>
                                <td className="px-4 py-2">
                                    <Button variant="outline" size="sm">
                                        Cancel
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">Event Room</td>
                                <td className="px-4 py-2">September 20, 2024</td>
                                <td className="px-4 py-2">September 20, 2024</td>
                                <td className="px-4 py-2">Birthday Party</td>
                                <td className="px-4 py-2">50</td>
                                <td className="px-4 py-2">jane@example.com</td>
                                <td className="px-4 py-2">
                                    <Badge variant="outline" className="bg-red-200 text-red-700">
                                        Not Approved
                                    </Badge>
                                </td>
                                <td className="px-4 py-2">
                                    <Button variant="outline" size="sm">
                                        Cancel
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">Grillcentrum</td>
                                <td className="px-4 py-2">September 25, 2024</td>
                                <td className="px-4 py-2">September 25, 2024</td>
                                <td className="px-4 py-2">Family Gathering</td>
                                <td className="px-4 py-2">20</td>
                                <td className="px-4 py-2">bob@example.com</td>
                                <td className="px-4 py-2">
                                    <Badge variant="outline" className="bg-green-200 text-green-700">
                                        Approved
                                    </Badge>
                                </td>
                                <td className="px-4 py-2">
                                    <Button variant="outline" size="sm">
                                        Cancel
                                    </Button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}