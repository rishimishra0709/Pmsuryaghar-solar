import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to demo company
  redirect('/demo-solar');
}
