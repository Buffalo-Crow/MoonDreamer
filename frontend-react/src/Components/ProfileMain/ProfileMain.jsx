import { useState, useEffect, useContext } from "react";
import "./ProfileMain.css";
import ZodiacSidebar from "../ZodiacSidebar/ZodiacSidebar";
import DreamPreviewList from "../DreamPreviewList/DreamPreviewList";
import DreamDetailCard from "../DreamDetailCard/DreamDetailCard";
import { DreamContext } from "../../contexts/dreamContext";

function ProfileMain({ handleDeleteDreamClick, handleEditDreamClick, dreams }) {
  const [selectedSign, setSelectedSign] = useState(null);
  const { selectedDream, setSelectedDream } = useContext(DreamContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 885);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 885);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredDreams = selectedSign
    ? dreams.filter((dream) => dream.sign === selectedSign)
    : dreams;

  return (
    <div className={`profile-main ${selectedDream ? "dream-selected" : ""}`}>
      {/* Only hide sidebar if on mobile AND dream is selected */}
      {!(isMobile && selectedDream) && (
        <ZodiacSidebar onSelectSign={setSelectedSign} />
      )}

      {selectedDream ? (
        <DreamDetailCard
          handleDeleteDreamClick={handleDeleteDreamClick}
          handleEditDreamClick={handleEditDreamClick}
          dream={selectedDream}
          onBack={() => setSelectedDream(null)}
        />
      ) : (
        <DreamPreviewList
          dreams={filteredDreams}
          onSelectDream={setSelectedDream}
        />
      )}
    </div>
  );
}

export default ProfileMain;
