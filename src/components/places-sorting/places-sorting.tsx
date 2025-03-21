import { SortOrder } from '../../const';

const defaultSortOrder = SortOrder.Popular;

type PlacesSortingProps = {
  onSortSelect: (sortOrder: SortOrder) => void;
}

export default function PlacesSorting ({ onSortSelect }: PlacesSortingProps) {
  const sortOrders = Object.values(SortOrder);
  // использовать useState?
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {defaultSortOrder}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {sortOrders.map((sortOrder) => (
          <li
            key={sortOrder}
            className="places__option"
            tabIndex={0}
            onClick={() => onSortSelect(sortOrder)}
          >
            {sortOrder}
          </li>
        ))}
      </ul>
    </form>
  );
}

//         <li className="places__option places__option--active" tabIndex={0}>Popular</li>
