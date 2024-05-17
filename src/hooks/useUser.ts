import { useAppSelector } from '../store/store'

export const useStatus = () => {
	const auth = useAppSelector(store => store.auth)
	return {
		...auth
	}
}