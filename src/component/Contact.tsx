import CardIcon from "./card/CardIcon";
import {contactData} from "../data/contactData";

function Contact() {
  return (
    <>
      <div
        id="contact"
        className="flex justify-center items-center w-full h-80 bg-blue-100"
      >
        <div className="flex flex-col gap-4 justify-start items-center bg-white p-8 w-[350px] md:w-[600px] rounded-xl">
          <div className="w-full bg-blue-100 p-4 h-fit text-center font-bold">
            Contact
          </div>
          <div className="flex flex-row gap-4 justify-center items-center">
            {contactData.map((item) => (
              <CardIcon
                key={item.id}
                color={item.color}
                destination={item.destination}
                source={item.source}
              />
            ))}
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
