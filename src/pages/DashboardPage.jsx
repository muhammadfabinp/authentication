
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function DashboardPage(){
  const {user,logout} = useAuth();
  const navigate= useNavigate();

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold">
          Welcome, {user.fullName}
        </h1>
        <img src={user.avatar} alt={user.fullName}/>
        <p> Username: {user.username}</p>
        <p> Email: {user.email}</p>
        <p>Member since: {user.createdAt}</p>
        <button onClick={() => {logout() ;
        navigate("/login");}}> Logout</button>
        </div>
    </div>
  );
}

export default DashboardPage;