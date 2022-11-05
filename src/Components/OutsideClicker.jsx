import React, { useRef, useEffect } from "react";
// import PropTypes from "prop-types";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideClicker(ref) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                alert("You clicked outside of me!");
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideClicker(props) {
    const wrapperRef = useRef(null);
    useOutsideClicker(wrapperRef);

    return <div ref={wrapperRef}>{props.children}</div>;
}

// OutsideClicker.propTypes = {
//     children: PropTypes.element.isRequired
// };

export default OutsideClicker;
