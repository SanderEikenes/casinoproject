import CoinBank from "@/components/coinBank";

export default function Page() {
  return (
    <div className="justify-center text-center">
      <h1 className="text-4xl">Admin Page</h1>
      <div className="my-4">
        <CoinBank />
      </div>
    </div>
  );
}