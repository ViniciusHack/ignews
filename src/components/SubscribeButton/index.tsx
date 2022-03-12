import { signIn, useSession } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({priceId}: SubscribeButtonProps) {
    const {data: session} = useSession();
    async function handleSubscritbe() {
        if(!session) {
            signIn
            return;
        }

        try {
            const response = await api.post('/subscribe')

            const { sessionId } = response.data
            const stripe = await getStripeJs();
            await stripe.redirectToCheckout({sessionId})
        } catch (err) {
            alert(err.message);
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