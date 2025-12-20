import { PiGithubLogo } from "react-icons/pi";


interface ProjectCardProps {
  link:string;
  title:string;
  description:string;
  image:string;
}

export default function ProjectCard({ link, title, description, image }: ProjectCardProps) {
  return (
    <a
      href={link}
      className="group flex border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900 transition-colors min-h-48 sm:min-h-56"
    >
      {/* Left Content */}    
      <div className="flex flex-col p-5 sm:p-7 gap-4 flex-1 justify-between">
        <PiGithubLogo size={30} color="#FFFFFF" />
        <div className="flex flex-col gap-1">
          <p className="text-white font-bold text-base sm:text-lg">
            {title}
          </p>
          <p
            className="text-zinc-500 text-xs sm:text-sm leading-relaxed line-clamp-3"
          >
            {description}
          </p>
        </div>
      </div>
      <div
        className="w-24 sm:w-36 md:w-56 bg-zinc-800 rounded-tl-lg mt-7 group-hover:bg-zinc-700 transition-colors"
      >
        <img src={image} alt={title} className="w-full h-full object-cover rounded-tl-lg" />
      </div>
    </a>
  );
}