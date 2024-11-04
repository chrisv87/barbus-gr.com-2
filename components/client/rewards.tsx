"use client";

import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Star, Crown, Sparkles } from "lucide-react";

export function ClientRewards() {
  const currentLevel = 3;
  const currentXP = 350;
  const xpForNextLevel = 500;
  const progress = (currentXP / xpForNextLevel) * 100;

  const levels = [
    {
      level: 1,
      name: "Bronze",
      xpRequired: 0,
      perks: [
        { type: "discount", value: "5% off tickets" },
        { type: "access", value: "24-hour early booking access" }
      ]
    },
    {
      level: 5,
      name: "Silver",
      xpRequired: 500,
      perks: [
        { type: "discount", value: "10% off tickets" },
        { type: "access", value: "48-hour early booking access" },
        { type: "bonus", value: "2x XP on weekday events" }
      ]
    },
    {
      level: 10,
      name: "Gold",
      xpRequired: 1000,
      perks: [
        { type: "discount", value: "15% off tickets" },
        { type: "access", value: "72-hour early booking access" },
        { type: "bonus", value: "2x XP on all events" },
        { type: "exclusive", value: "Access to VIP events" }
      ]
    },
    {
      level: 20,
      name: "Diamond",
      xpRequired: 2000,
      perks: [
        { type: "discount", value: "20% off tickets" },
        { type: "access", value: "1-week early booking access" },
        { type: "bonus", value: "3x XP on all events" },
        { type: "exclusive", value: "VIP events & exclusive promotions" },
        { type: "special", value: "Personal event concierge" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-purple-300">Level {currentLevel}</h3>
            <p className="text-sm text-purple-400">XP: {currentXP}/{xpForNextLevel}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-purple-400">{xpForNextLevel - currentXP} XP to next level</p>
          </div>
        </div>
        <Progress value={progress} className="h-2 bg-purple-950" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {levels.map((level) => (
          <Card
            key={level.level}
            className={`bg-black/40 border-purple-800/30 ${
              currentLevel >= level.level ? "ring-2 ring-purple-500" : "opacity-75"
            }`}
          >
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {level.name === "Bronze" && <Trophy className="h-5 w-5 text-orange-400" />}
                  {level.name === "Silver" && <Star className="h-5 w-5 text-gray-300" />}
                  {level.name === "Gold" && <Crown className="h-5 w-5 text-yellow-400" />}
                  {level.name === "Diamond" && <Sparkles className="h-5 w-5 text-blue-400" />}
                  <h4 className="font-semibold text-purple-300">Level {level.level} - {level.name}</h4>
                </div>
                <span className="text-sm text-purple-400">{level.xpRequired} XP</span>
              </div>
              
              <ul className="space-y-2 text-sm">
                {level.perks.map((perk, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      perk.type === 'discount' ? 'bg-green-400' :
                      perk.type === 'access' ? 'bg-blue-400' :
                      perk.type === 'bonus' ? 'bg-yellow-400' :
                      perk.type === 'exclusive' ? 'bg-purple-400' :
                      'bg-pink-400'
                    }`} />
                    <span className={currentLevel >= level.level ? 'text-gray-200' : 'text-gray-500'}>
                      {perk.value}
                    </span>
                  </li>
                ))}
              </ul>

              {currentLevel < level.level && (
                <div className="text-sm text-gray-500 italic">
                  Unlock at Level {level.level}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-black/40 border-purple-800/30">
        <CardContent className="p-4 space-y-2">
          <h4 className="font-semibold text-purple-300">How to Earn XP</h4>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center space-x-2">
              <span className="w-1 h-1 rounded-full bg-purple-400" />
              <span>Regular Route Rides: 50 XP</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1 h-1 rounded-full bg-purple-400" />
              <span>Special Events: 100 XP</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1 h-1 rounded-full bg-purple-400" />
              <span>All Night Pass: 150 XP</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1 h-1 rounded-full bg-purple-400" />
              <span>XP Multiplier Events: 2x-3x normal XP</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}