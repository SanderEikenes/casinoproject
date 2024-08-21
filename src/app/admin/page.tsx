import CoinBank from "@/components/coinBank";

export default function Page() {
  return (
    <div className="flex flex-col justify-center text-center mt-8">
      <h1 className="text-4xl">Admin Page</h1>
      <div className="my-4">
        <CoinBank />
      </div>
    </div>
  );
}