import CondidateForm from "../features/condidate/CondidateForm";

function CondidatePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r  from-gray-300 to-gray-400">
      <div
        className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-8 h-4/5"
        style={{ minHeight: "80vh" }}
      >
        <h1 className="text-4xl font-bold mb-4 text-center uppercase ">
          new Condidate
        </h1>

        <CondidateForm />
      </div>
    </div>
  );
}

export default CondidatePage;
