import api from "../api"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default async function BuilderPage() {
  const players = await api.player.list();
  return (
    <form action="" className="m-auto max-w-md grid gap-4">
        <Table className="border">
        <TableHeader>
            <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead className="text-right"></TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {players.map(({name}) => 
            <TableRow key={name}>
                <TableCell>{name}</TableCell>
                <TableCell className="text-right">
                    <Checkbox name="player" value={name} />
                </TableCell>
            </TableRow>
            )}
        </TableBody>
        </Table>
        <Button type="submit">Armar equipos</Button>
    </form>
  )
}
