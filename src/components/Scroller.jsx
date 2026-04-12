function Scroller() {
  const items = [
    " For genuine, safe, and effective treatment, always verify you are at the correct location.", "MUNNA Ayurvedic Bone Setting & Oil Massage Center.","SINCE 1930"
  ];

  return (
    <div className="overflow-hidden bg-green-900 text-white py-2">
      <div className="flex w-max animate-ticker">
        
        {/* Combine both copies in ONE flex */}
        {[...items, ...items].map((text, index) => (
          <span key={index} className={`${index===0?"":index===1?"text-yellow-500":""} mx-6 whitespace-nowrap font-semibold sm:text-md md:text-2xl `}>
            {text}
          </span>
        ))}

      </div>
    </div>
  );
}

export default Scroller