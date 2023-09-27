import { Dispatch, SetStateAction } from "react";
import { Close } from "@mui/icons-material";

export default function InpPopover({
  setFilterParam,
  filterParam,

  toggle,
  openFilter,
}: {
  toggle: boolean;
  openFilter: (e:any) => void;

  filterParam: string;
  setFilterParam: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div
      onClick={openFilter}
      className={`${toggle ? "grid" : "hidden"}
    w-full h-full grid-cols-6 place-items-center absolute top-0 left-0 bg-neutral-50 `}
    >
      {/* input  */}
      <div className="flex items-center justify-center gap-2 col-span-5">
        <p>horas:</p>
        <input
        value={filterParam}
          onChange={(e) => setFilterParam(() => e.target.value)}
          id="timeFilterInp"
          type="text"
          inputMode="numeric"
          className="w-[36px] outline-none bg-neutral-200 rounded text-center"
        />
      </div>

      {/* btn de fechar */}
      <div className="relative w-8 h-8 grid place-items-center ">
        <div className="kase open_filter"></div>
        <Close sx={{fontSize:'30px'}}/>
      </div>
    </div>
  );
}
