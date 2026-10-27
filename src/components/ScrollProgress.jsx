export default function ScrollProgress({ progress }) {
  return <div className="scroll-progress" role="presentation" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>;
}
