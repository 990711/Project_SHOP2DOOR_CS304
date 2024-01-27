import { useLocation } from 'react-router-dom';

const DeliverRider_Dashboard = () => {
    const location = useLocation();
    const user = location.state?.user;

    console.log(user); // Check the user prop

    return (
        <div>
            <h4>hello, {user}</h4>
        </div>
    );
};

export default DeliverRider_Dashboard;
