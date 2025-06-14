import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function AnalyticsSnapshot() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchSnapshot = async () => {
      const docRef = doc(db, 'analyticsSnapshot', 'latest');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
      }
    };
    fetchSnapshot();
  }, []);

  if (!data) return <p>Loading analytics...</p>;

  return (
    <div className="bg-white p-4 rounded shadow-md my-4 max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-2 text-blue-700">📈 Analytics Overview</h3>
      <p>📄 Page Views: {data.pageViews}</p>
      <p>📉 Bounce Rate: {data.bounceRate}%</p>
      {data.updatedAt ? (
        <p className="text-sm text-gray-500">
          Last updated: {data.updatedAt.toDate().toLocaleString()}
        </p>
      ) : (
        <p className="text-sm text-red-500">No update timestamp available</p>
      )}
    </div>
  );
}
