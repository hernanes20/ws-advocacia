import { Informativos } from '@/components/informativos';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Informativos - Williams Silva Advocacia',
  description: 'Acesse nossos portais de informações com atualizações sobre legislação, programas tributários e notícias do setor jurídico',
};

export default function InformativosPage() {
  return (
    <main className="bg-slate-900 min-h-screen">
      <Informativos />
    </main>
  );
}
