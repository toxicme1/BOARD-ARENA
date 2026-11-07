import {
  AdminLayout,
} from '../../components/admin';
import { TournamentBuilderCanvas } from '../../components/tournament/TournamentBuilderCanvas';

export default function TournamentBuilderScreen() {
  return (
    <AdminLayout>
      <div className="h-[calc(100vh-4rem)]">
        <TournamentBuilderCanvas />
      </div>
    </AdminLayout>
  );
}