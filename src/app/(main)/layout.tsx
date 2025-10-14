import { Metadata, Viewport } from 'next';
import Layout from '../../layout/layout';

interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'OtelMood',
  description: 'Best Hotel Manager',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function AppLayout({ children }: AppLayoutProps) {
    return <Layout>{children}</Layout>;
}
