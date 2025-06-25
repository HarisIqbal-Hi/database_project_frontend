import styles from './ViewDetailsButton.module.scss';

export default function ViewDetailsButton({onClick}: { onClick?: () => void }) {
    return (
        <button className={styles.button} onClick={onClick}>
            View Details
            <span className={styles.icon}>
        {/* Simple right arrow SVG */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M8 5l5 5-5 5" stroke="#3A5360" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
         </span>
        </button>
    );
}
