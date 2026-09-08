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
    <div
      id="contact"
      className="relative flex justify-center items-center w-full py-20 md:py-28 px-4 bg-white min-h-[50vh] md:min-h-[60vh] overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%233E8DE3%22 fillOpacity%3D%220.02%22%3E%3Cpath d%3D%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#3E8DE3]/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#143AA2]/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6 justify-center items-center bg-gradient-to-br from-[#3E8DE3] to-[#2E6FBF] p-8 md:p-12 w-full max-w-[480px] md:max-w-[800px] rounded-2xl shadow-2xl border border-white/10 animate-scale-in">
        <div className="text-center w-full animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-white/50 animate-pulse" />
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white tracking-tight">
            Let's Connect
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
            Always open to discussing new projects, creative ideas, or opportunities to be part of something amazing.
          </p>
        </div>

        <div
          className="flex flex-wrap gap-4 md:gap-5 justify-center items-center animate-fade-in-up"
          style={{ animationDelay: "0.3s", animationFillMode: "both" }}
        >
          {visibleContacts.length > 0 ? (
            visibleContacts.map((item, index) => (
              <div
                key={item.id}
                className="animate-fade-in-up"
                style={{
                  animationDelay: `${0.4 + index * 0.08}s`,
                  animationFillMode: "both",
                }}
              >
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
  );
}

export default Contact;
