import React, { useCallback, useState } from "react";
import Header from "./Header";
import { useDropzone } from "react-dropzone";
import {
  FileArchive,
  FileCheck,
  FileUp,
  Play,
  Trash2,
  Trophy,
  Upload,
} from "lucide-react";
import { SummaryObj } from "../model/SummaryObj";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ScaredyCatvsAllIn from "../data/SUM_all_in_vs_scaredy_cat.json"
import ScaredyCatvsOptimizer from "../data/SUM_optimizer_vs_scaredy_cat.json"
import ScaredyCatvsPreflopRanger from "../data/SUM_preflop_ranger_vs_scaredy_cat.json"
import OptimizervsPreflopRanger from "../data/SUM_optimizer_vs_preflop_ranger.json"
import ScaredyCatvsBlindBandit from "../data/SUM_blind_bandit_vs_scaredy_cat.json"
import BlindBanditvsMrCarlo from "../data/SUM_blind_bandit_vs_mr_carlo.json"
import Finals from "../data/SUM_graph_von_monte_carlo_vs_harry.json"

interface UploadPageProps {
  setSummary: React.Dispatch<React.SetStateAction<SummaryObj | null>>;
  setLog: React.Dispatch<React.SetStateAction<string[][] | null>>;
  summary: SummaryObj | null;
}

function UploadPage({ setSummary, setLog, summary }: UploadPageProps) {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState<Boolean>(false);

  const setLocalStorage = (summaryJson: any) => {
    localStorage.setItem("summary", JSON.stringify(summaryJson));
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        try {
            const json = JSON.parse(reader.result as string);
            console.log(json);
            if (json["Logs"] && json["Top hands"] && json["Player stats"] && json["Score"] && json["Discretized bankroll counts"]) {
                setSummary(new SummaryObj(json));
                setLocalStorage(json);
            } else {
                throw new Error("Invalid summary.json file. Needs to be a valid json file that contains 'Logs', 'Top hands', 'Player stats', 'Score', and 'Discretized bankroll counts' fields.");
            }
        } catch (e) {
            console.error(e);
            setFiles([]);
            alert("Invalid summary.json file. Needs to be a valid json file that contains 'Logs', 'Top hands', 'Player stats', 'Score', and 'Discretized bankroll counts' fields.");
        }
      };
      console.log(acceptedFiles[0]);
      reader.readAsText(acceptedFiles[0]);

      return setFiles(acceptedFiles);
    },
    [setSummary]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const gameHandler = () => {
    navigate("/game");
  };

  const sampleGame = (json:any) => {
    setSummary(new SummaryObj(json))
    setLocalStorage(json)
    gameHandler()
  }

  return (
    <div className="flex flex-col h-full w-screen">
      <Header />
      <div className="flex items-center h-full mt-5">
        <div className="flex w-screen justify-center">
          <div className="flex">
            <div className="space-y-4 flex space-x-2">
              <div>
                <div className="mt-2 max-w-[35rem] bg-white p-4 rounded-lg border">
                  <div className="text-text-color font-semibold flex text-xl">
                    <h1>Watch and Analyze Poker Bot Matches</h1>
                  </div>
                  <div className="flex text-left text-xs">
                    <p className="text-text-color">
                      Upload a summary.json file from a match between two poker
                      bots to watch and analyze their gameplay. This file can be
                      generated by running the poker bot engine and retrieving
                      it from the logs directory.{" "}
                      {text &&
                        "The summary.json contains comprehensive details about the match, such as the bots' actions and overall statistics. Each match up consists of several hundred poker rounds due to the tournament format, where two bots play a unique 1v1 variation of Texas Hold'em. You can also explore and review matches played by your peers' poker bots if they share their game summary files with you."}{" "}
                      <span
                        className="font-bold cursor-pointer"
                        onClick={() => setText(!text)}
                      >
                        {text ? "(Less)" : "(Show more)"}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="bg-white px-4 py-4 rounded-lg mt-2 border shadow-sm space-y-5 max-w-[35rem]">
                  <div>
                    <div>
                      <div className="flex justify-between flex-1 items-center">
                        <div className="flex space-x-2 items-center">
                          <div>
                            <FileUp className="text-text-color size-6 cursor-pointer hover:scale-105 transition-all" />
                          </div>
                          <div>
                            <h1 className="text-text-color text-xl font-semibold">
                              Upload your Game Summary File
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div className="text-text-color flex justify-start text-sm  ml-1">
                        <p>
                          Upload your Summary{" "}
                          <span className="font-medium">.json</span> file
                        </p>
                      </div>
                    </div>
                    {/* Dropzone */}
                    <div>
                      <div
                        {...getRootProps()}
                        className="bg-green-500/10 hover:bg-green-500/5 transition-all mt-2 cursor-pointer"
                      >
                        <input type="file" {...getInputProps()} />
                        <div className="border border-dashed rounded-md  hover:border-solid transition-all  flex justify-center px-9 py-14 border-green-700">
                          {isDragActive ? (
                            <div>
                              <div className="flex flex-col justify-center">
                                <div className="flex justify-center">
                                  <FileCheck className="text-green-600 size-6" />
                                </div>
                                <div className="text-text-color font-medium text-sm">
                                  <p>Drop your files here</p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="flex flex-col justify-center">
                                <div className="flex justify-center">
                                  <FileArchive className="text-green-600 size-6" />
                                </div>
                                <div className="text-text-color font-medium text-sm">
                                  <p>Drag & drop your files here</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Footer */}
                      <div className="text-text-color flex text-xs font-medium mt-2">
                        <p>
                          Only <span className="font-bold">.json</span> are
                          allowed
                        </p>
                      </div>

                      {/* Filedisplay */}
                      {files.length > 0 && (
                        <>
                          <div className="mt-1">
                            <div className="flex w-full mt-5">
                              <button
                                className="border-text-color flex justify-center items-center space-x-3 w-full hover:border-text-color/40 transition-all border text-text-color h-9 font-medium rounded-md group"
                                onClick={gameHandler}
                              >
                                <span className="">Start Game</span>
                              </button>
                            </div>
                            <div className="flex mt-4 text-sm font-medium">
                              <span className="text-text-color">File</span>
                            </div>
                            {files.map((file, index) => (
                              <>
                                <AnimatePresence key={index}>
                                  <motion.div
                                    initial={{ x: 300, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -300, opacity: 0 }}
                                    key={file.name}
                                    className="border rounded-md py-3 px-3"
                                  >
                                    <div className="flex justify-between items-center ">
                                      <div className="flex space-x-3 items-center">
                                        <div className="border p-2 rounded-full hover:bg-slate-100 transition-all">
                                          <Upload className="text-text-color size-4" />
                                        </div>
                                        <div className="flex flex-col">
                                          <div className="text-text-color font-semibold">
                                            <p className="text-sm">
                                              {file.name}
                                            </p>
                                          </div>
                                          <div className="text-text-color flex text-xs font-medium">
                                            <p className="">
                                              {file.size / 1000} KB
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className="p-2 hover:ring-1 rounded-full hover:ring-slate-400 transition-all cursor-pointer "
                                        onClick={() => setFiles([])}
                                      >
                                        <Trash2 className="text-text-color size-4" />
                                      </div>
                                    </div>

                                    <div className="h-[2.8px] rounded-full relative w-full bg-slate-300 mt-2">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 3 }}
                                        className="bg-text-color h-[2.8px]"
                                      />
                                    </div>
                                  </motion.div>
                                </AnimatePresence>

                                {/* Summary-Infos */}
                                <motion.div
                                  className=""
                                  initial={{ x: 300, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  exit={{ x: -300, opacity: 0 }}
                                >
                                  <div className="flex mt-2 text-sm font-medium">
                                    <span className="text-text-color">
                                      Infos
                                    </span>
                                  </div>
                                  <div className="mt-1 border rounded-md py-3 px-3">
                                    <div className="flex space-x-3 items-center">
                                      <div className="border p-2 rounded-full hover:bg-slate-100 transition-all">
                                        <Trophy className="text-text-color size-4" />
                                      </div>
                                      <div className="flex flex-col">
                                        <div className="text-text-color flex font-semibold">
                                          <p className="text-sm">Match:</p>
                                        </div>
                                        <div className="text-text-color flex text-xs font-medium">
                                          <p className="">
                                            {summary?.playerStats[0].name}{" "}
                                            <span className="font-bold">
                                              vs
                                            </span>{" "}
                                            {summary?.playerStats[1].name}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              </>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex text-text-color">
                <div className="bg-white border p-2 px-4 rounded-md -mt-2">
                  <div className="flex flex-col justify-start">
                    <h1 className="font-medium flex">Sample Games</h1>
                    <p className="text-sm opacity-60">
                      Watch some sample games if you don't have a json file.
                    </p>
                  </div>
                  <div className="mt-5 space-y-3">
                    <h1 className="cursor-pointer font-medium border flex items-center px-2 justify-between -ml-2 p-1 rounded-md hover:scale-105 transition-all" onClick={(() => sampleGame(Finals))}>
                      <div>Finals</div>
                      <Play className="size-5 text-green-700" />
                    </h1>
                    <h1 className="cursor-pointer font-medium border flex items-center px-2 justify-between -ml-2 p-1 rounded-md hover:scale-105 transition-all" onClick={(() => sampleGame(ScaredyCatvsBlindBandit))}>
                      <div>Blind Bandit vs Scaredy Cat</div>
                      <Play className="size-5 text-green-700" />
                    </h1>
                    <h1 className="cursor-pointer font-medium border flex items-center px-2 justify-between -ml-2 p-1 rounded-md hover:scale-105 transition-all" onClick={(() => sampleGame(ScaredyCatvsAllIn))}>
                      <div>All In vs Scaredy Cat</div>
                      <Play className="size-5 text-green-700" />
                    </h1>
                    <h1 className="cursor-pointer font-medium border flex items-center px-2 justify-between -ml-2 p-1 rounded-md hover:scale-105 transition-al"  onClick={(() => sampleGame(BlindBanditvsMrCarlo))}>
                      <div>Blind Bandit vs Mr Carlo</div>
                      <Play className="size-5 text-green-700" />
                    </h1>
                    <h1 className="cursor-pointer font-medium border flex items-center px-2 justify-between -ml-2 p-1 rounded-md hover:scale-105 transition-al"  onClick={(() => sampleGame(OptimizervsPreflopRanger))}>
                      <div>Optimizer vs Preflop Ranger</div>
                      <Play className="size-5 text-green-700" />
                    </h1>
                    <h1 className="cursor-pointer font-medium border flex items-center px-2 justify-between -ml-2 p-1 rounded-md hover:scale-105 transition-al"  onClick={(() => sampleGame(ScaredyCatvsOptimizer))}>
                      <div>Scaredy Cat vs Optimizer</div>
                      <Play className="size-5 text-green-700" />
                    </h1>
                    <h1 className="cursor-pointer font-medium border flex items-center px-2 justify-between -ml-2 p-1 rounded-md hover:scale-105 transition-al"  onClick={(() => sampleGame(ScaredyCatvsPreflopRanger))}>
                      <div>Preflop Ranger vs Scaredy Cat</div>
                      <Play className="size-5 text-green-700" />
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
