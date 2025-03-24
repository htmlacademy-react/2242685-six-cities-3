import { SortOrder } from '../../const';
import { selectSortOrder } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { useState } from 'react';

export default function PlacesSorting () {
  const sortOrders = Object.values(SortOrder);
  const dispatch = useAppDispatch();
  const currentSortOrder = useAppSelector((state) => state.sortOrder);
  const [isSortOrderListOpen, setIsSortOrderListOpen] = useState(false);

  const handleSortTypeClick = () => {
    setIsSortOrderListOpen(!isSortOrderListOpen);
  };

  const handleOptionClick = (sortOrder: SortOrder) => (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(selectSortOrder(sortOrder));
    setIsSortOrderListOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        role="button"
        onClick={handleSortTypeClick}
      >
        {currentSortOrder}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isSortOrderListOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {sortOrders.map((sortOrder) => (
            <li
              key={sortOrder}
              className="places__option"
              tabIndex={0}
              onClick={handleOptionClick(sortOrder)}
            >
              {sortOrder}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
