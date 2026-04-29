import { Link } from "react-router-dom";

type TFeaturedItem = {
  _id: string;
  name: string;
  photoURL: string;
  price: number | string;
  brand?: string;
  category?: string;
  model?: string;
};

const FeatureadItem = ({ item }: { item: TFeaturedItem }) => {
  const { brand, category, model, name, photoURL, price, _id } = item;

  return (
    <Link to={`/details/${_id}`} className="block h-full">
      <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-3 transition hover:shadow-sm md:p-3">
        <div className="rounded-xl border border-border bg-muted/40 p-4">
          <div className="h-[200px] w-full">
            <img
              className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.01]"
              src={photoURL}
              alt={name}
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {brand ? (
            <span className="rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium text-muted-foreground">
              {brand}
            </span>
          ) : null}
          {category ? (
            <span className="rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium text-muted-foreground">
              {category}
            </span>
          ) : null}
          {model ? (
            <span className="rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium text-muted-foreground">
              {model}
            </span>
          ) : null}
        </div>

        <h1 className="mt-4 line-clamp-2 text-center text-lg font-semibold leading-snug text-foreground md:text-xl">
          {name}
        </h1>

        <div className="mt-2 flex items-center justify-center">
          <p className="text-base font-semibold text-foreground md:text-lg">
            ${price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default FeatureadItem;
