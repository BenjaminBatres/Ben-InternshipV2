export default function StatisticsData({ number, title }) {
  return (
    <div className="statistics__data">
      <div className="statistics__data--number">{number}</div>
      <div className="statistics__data--title">
        {title.map((text, index) =>
          typeof text === "string" ? (
            <span key={index}>{text}</span>
          ) : (
            <span key={index} className="bold">
              {text.bold}
            </span>
          )
        )}
      </div>
    </div>
  );
}
