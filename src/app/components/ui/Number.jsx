export default function Number({ icon, title, subTitle }) {
  return (
    <div className="numbers">
      <div className="numbers__icon">{icon}</div>
      <div className="numbers__title">{title}</div>
      <div className="numbers__sub--title">{subTitle}</div>
    </div>
  );
}
