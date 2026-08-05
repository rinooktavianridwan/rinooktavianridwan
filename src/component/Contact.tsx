import CardIcon from "./card/CardIcon";
import type { ContactResponse } from "../api/types";

type ContactProps = {
  contacts: ContactResponse[];
};

function Contact({ contacts }: ContactProps) {
  const visibleContacts = contacts
    .filter((item) => item.isVisible)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <div
        id="contact"
        className="flex justify-center items-center w-full h-80 bg-white pb-12"
      >
        <div className="flex flex-col gap-4 justify-start items-center bg-[#3E8DE3] p-8 w-[350px] md:w-[600px] rounded-xl shadow-xl animate-scale-in hover:shadow-2xl transition-shadow duration-300">
          <div className="w-full bg-[#143AA2] rounded-md p-2 h-fit text-center font-bold text-white animate-fade-in-down" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            Contact
          </div>
          <div className="flex flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            {visibleContacts.length > 0 ? (
              visibleContacts.map((item, index) => (
                <div key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${0.5 + index * 0.1}s`, animationFillMode: 'both' }}>
                  <CardIcon
                    color={item.color ?? "#3E8DE3"}
                    destination={item.url}
                    source={item.iconUrl}
                    platformName={item.platformName}
                  />
                </div>
              ))
            ) : (
              <p className="text-white/80 text-lg text-center py-4">
                Belum ada kontak yang ditampilkan.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
