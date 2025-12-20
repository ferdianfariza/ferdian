import * as React from "react";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
  type Activity,
} from "@/components/kibo-ui/contribution-graph";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface GithubGraphProps {
  data: Activity[];
}

export function GithubGraph({ data }: GithubGraphProps) {
  return (
    <ContributionGraph data={data}>
      <ContributionGraphCalendar>
        {({ activity, dayIndex, weekIndex }) => (
          <ContributionGraphBlock
            activity={activity}
            dayIndex={dayIndex}
            weekIndex={weekIndex}
                      className={cn(
            'data-[level="0"]:fill-[#ebedf0] dark:data-[level="0"]:fill-zinc-800/50',
            'data-[level="1"]:fill-[#9be9a8] dark:data-[level="1"]:fill-de-york-500/20',
            'data-[level="2"]:fill-[#40c463] dark:data-[level="2"]:fill-de-york-500/40',
            'data-[level="3"]:fill-[#30a14e] dark:data-[level="3"]:fill-de-york-500/70',
            'data-[level="4"]:fill-[#216e39] dark:data-[level="4"]:fill-de-york-400'
          )}
          />
        )}
      </ContributionGraphCalendar>
      <ContributionGraphFooter>
        <ContributionGraphTotalCount>
          {({ totalCount, year }) => (
            <div className="flex items-center gap-2 ">
              <span className="text-muted-foreground text-sm">Year {year}:</span>
              <Badge variant="secondary">
                {totalCount.toLocaleString()} contributions
              </Badge>
            </div>
          )}
        </ContributionGraphTotalCount>
        <ContributionGraphLegend>
          {({ level }) => (
            <div
              className="group relative flex h-3 w-3 items-center justify-center"
              data-level={level}
            >
              <div
                className={`h-full w-full rounded-sm border border-border ${
                  level === 0 ? "bg-muted" : ""
                } ${
                  level === 1 ? "bg-emerald-200 dark:bg-emerald-900" : ""
                } ${
                  level === 2 ? "bg-emerald-400 dark:bg-emerald-700" : ""
                } ${
                  level === 3 ? "bg-emerald-600 dark:bg-emerald-500" : ""
                } ${
                  level === 4 ? "bg-emerald-800 dark:bg-emerald-300" : ""
                } `}
              />
              <span className="-top-8 absolute hidden rounded bg-popover px-2 py-1 text-popover-foreground text-xs shadow-md group-hover:block">
                Level {level}
              </span>
            </div>
          )}
        </ContributionGraphLegend>
      </ContributionGraphFooter>
    </ContributionGraph>
  );
}
