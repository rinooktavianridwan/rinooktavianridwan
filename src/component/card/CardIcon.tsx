// components/Card.jsx

interface CardProps {
  color: string;
  destination: string;
  source: string;
}

function CardIcon({ color, destination, source }: CardProps) {
  return (
    <button
      onClick={() => window.open(destination, '_blank')}
      type="button"
      data-twe-ripple-init
      data-twe-ripple-color="light"
      style={{ backgroundColor: color}} 
      className="mb-2 inline-block rounded px-6 py-2.5 transition bg-opacity-1 duration-300 ease-in-out hover:bg-opacity-1"
    >
      <img src={source} alt="icon" className="h-4 w-4 md:h-10 md:w-10" />
    </button>
  );
}

export default CardIcon;
