export default function SDKPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        PortalProof Developer SDK
      </h1>

      <p className="mb-6">
        Integrate credential verification into any application.
      </p>

      <div className="border rounded-lg p-4">
        <h2 className="font-bold mb-2">
          Verify Credential
        </h2>

        <pre className="overflow-auto">
{`import { verifyCredentialOnChain } from "@/lib/contract";

const result = await verifyCredentialOnChain(
  credentialId
);

console.log(result);`}
        </pre>
      </div>
    </main>
  );
}