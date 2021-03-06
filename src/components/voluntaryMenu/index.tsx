import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Container, Contents, Logout } from "./styles";
import { AiOutlineClose } from "react-icons/ai";
import api from "../../services/api";
import { useLogin } from "../../Providers/Login-Voluntaries";
import { FiLogOut } from "react-icons/fi";

interface iVoluntaryProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

interface iUser {
  name: string;
}

const VoluntaryMenu = ({ visible, setVisible }: iVoluntaryProps) => {

  const id = localStorage.getItem("@Bom ancião: userID") || ""

  const nameUser = localStorage.getItem("@Bom ancião: userName") || ""
  
  const [user, setUser] = useState<iUser[]>([] as iUser[])
  
  const { userId, userName} = useLogin()

  const history = useHistory()


  useEffect(() => {
    reqUser()
  }, [id])


  const showMenu = () => {
    setVisible(false);
  };

  const reqUser = async () => {
    const response = await api.get(`/users?id=${id}`)
    setUser(response.data)
    
  }

  const handleLogout = async () => {
    await localStorage.clear()
    await history.push("/")
    window.location.reload()
  }



  return (
    <>
      <Container visible={visible}>
        <Contents visible={visible}>
          <section className="User">
            <div>
              <h1>
                {user.map((letter) => {
                  return `${letter.name.substring(0, 1)}`
                })}
              </h1>

              <h2>
                {user.map((n) => {
                  return `${n.name}`
                })}
              </h2>
            </div>
          </section>
          <AiOutlineClose className="Close" onClick={showMenu} />
          <NavLink activeClassName="selected" exact to="/profile">
            Meus dados
          </NavLink>
          <NavLink activeClassName="selected" exact to="/my-events">
            Eventos
          </NavLink>
          <NavLink activeClassName="selected" exact to="/search-institutions">
            Buscar Instituições
          </NavLink>

          <Logout onClick={handleLogout}>
            <FiLogOut />
            <p>Sair</p>
          </Logout>
        </Contents>
      </Container>
    </>
  );

}


export default VoluntaryMenu;
