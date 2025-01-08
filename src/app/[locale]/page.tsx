// app/page.tsx
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import MultiStepForm from '@/components/MultiStepForm';

export default function Home() {
  return (
    <div>
      <Header />
      <div style={{ padding: '24px' }}>
        <MultiStepForm />
      </div>
      <Footer />
    </div>
  );
}