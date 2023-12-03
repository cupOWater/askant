import phone from "../assets/images/phone.png"
import github from "../assets/images/github.png"
import facebook from "../assets/images/facebook.png"
import instagram from "../assets/images/instagram.png"
import youtube from "../assets/images/youtube.png"
import mail from "../assets/images/mail.png"
import "../assets/styles/footer.css";

const Footer = () =>{
    return (
        <footer class = "footer">
            <div class = "container">
                <div class = "row">

                    <div class = "col">
                        <h4>CONTACT</h4>
                        <ul class="footer-list">
                            <li class="footer-left-item"><img src ={phone} class ="icon-left" alt="phone"/>+84 901234567</li>
                            <li class="footer-left-item"><img src ={mail} class ="icon-left"/> askant@gmail.com</li>
                            
                        </ul>
                    </div>

                    <div class = "col">
                        <h4>FOLLOW US</h4>
                        <ul>
                            <li class="footer-right-item"><img src={facebook} class="icon-right" alt="facebook"/></li>
                            <li class="footer-right-item"><img src={instagram} class="icon-right" alt="instagram"/></li>
                            <li class="footer-right-item"><img src={github} class="icon-right" alt="github"/></li>
                            <li class="footer-right-item"><img src={youtube} class="icon-right" alt="youtube"/></li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </footer>
    )
}
export default Footer