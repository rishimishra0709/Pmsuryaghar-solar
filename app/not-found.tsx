import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 to-amber-500">
            <div className="text-center text-white px-4">
                <h1 className="text-9xl font-bold mb-4">404</h1>
                <h2 className="text-4xl font-bold mb-4">Company Not Found</h2>
                <p className="text-xl mb-8">
                    The solar company you&apos;re looking for doesn&apos;t exist.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}
