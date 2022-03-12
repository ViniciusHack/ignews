import { signIn, useSession } from 'next-auth/react';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({priceId}: SubscribeButtonProps) {
    const {data: session} = useSession();
    function handleSubscritbe() {
        if(!session) {
            signIn
            return;
        }
    }

    return (
        <button 
        type="button"
        className={styles.subscribeButton}
        onClick={handleSubscritbe}
        >
            Subscribe Now
        </button>
    )
}