import { useState } from "react";
import './StarRating.css';

interface StarRatingProps {
    stars: number,
    changeable?: boolean
}
export default function StarRating(props: StarRatingProps) {
    const { stars, changeable } = props;
    const [rating, setRating] = useState(stars);
    const [hover, setHover] = useState(0);
    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? "on" : "off"}
                        onClick={() => changeable && setRating(index)}
                        onMouseEnter={() => changeable && setHover(index)}
                        onMouseLeave={() => changeable && setHover(rating)}
                    >
                        <span className="star">&#9733;</span>
                    </button>
                );
            })}
        </div>
    );
};