import { createPortal } from "react-dom";
import {useEffect} from "react";

export function LandingModal({isOpen, onClose, children}) {
        useEffect(() => {
            function handleCloseOnKeydown(e) {
                if(e.key === "Escape") onClose();
            }
            
            document.addEventListener("keydown", handleCloseOnKeydown);
            
            return () => {
                document.removeEventListener("keydown", handleCloseOnKeydown);
            }
        }, [onClose]);
        
        return createPortal(
        <div className={`modal-overlay ${isOpen && "show"}`}>
            <div className="modal">
                {children}
            </div>
        </div>, 
            document.querySelector("#modal-container")
    )
}