import Link from "next/link";

export default function CollectionsPage() {
  const collections = [
    { title: "Rings", desc: "From engagement solitaires to statement cocktail rings." },
    { title: "Necklaces", desc: "Delicate pendants and bold statement pieces." },
    { title: "Bracelets", desc: "Tennis bracelets, bangles, and charm bracelets." },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center mb-16">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">Curated with Love</p>
        <h1 className="font-serif text-4xl sm:text-5xl">Our Collections</h1>
      </div>
      <div className="space-y-20">
        {collections.map((col, i) => (
          <div key={col.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center`}>
            <div className={i % 2 === 1 ? "lg:order-2" : ""}><div className="aspect-[4/3] bg-gray-200 rounded-lg" /></div>
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <h2 className="font-serif text-3xl sm:text-4xl mb-4">{col.title}</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{col.desc}</p>
              <Link href="/shop" className="inline-block border border-charcoal/20 px-6 py-2.5 text-sm tracking-wider uppercase rounded hover:bg-charcoal hover:text-white transition-colors">View Collection</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
