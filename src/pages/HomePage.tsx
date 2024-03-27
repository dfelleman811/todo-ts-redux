import UserLogin from "../components/User/UserLogin";
import { Heading } from "../components/ui/Heading";
import { useAppSelector } from "../store/hooks";

const HomePage = () => {
    const currentUser = useAppSelector(
        (state) => state.currentUser.currentUser
    );

    let welcomeMessage;

    if (currentUser.username) {
        welcomeMessage = `Hello, ${currentUser.username}`;
        return <Heading text={welcomeMessage} size={3}></Heading>;
    }

    return <UserLogin />;
};

export default HomePage;
