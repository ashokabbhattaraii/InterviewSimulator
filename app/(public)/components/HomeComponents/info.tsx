import Button from "../../ResualbleComponents/Button/button";

export default function Info() {
  function handleOperation() {
    alert("Hello");
  }
  return (
    <div
      id="info"
      className="pt-20 text-white min-h-screen flex flex-col justify-center items-center text-center px-4"
    >
      <div className="max-w-4xl">
        <p className="text-xl md:text-2xl text-slate-300 mb-4">
          Welcome to{" "}
          <span className="text-blue-400 font-semibold">
            Interview Simulator
          </span>
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
          Practice Makes Perfect Interviews
        </h1>
      </div>
      <div id="btns" className="flex flex-col sm:flex-row gap-4">
        <Button text="Get Started" onClick={() => handleOperation()}></Button>
        <Button text="Learn More" onClick={() => handleOperation()}></Button>
      </div>
    </div>
  );
}
