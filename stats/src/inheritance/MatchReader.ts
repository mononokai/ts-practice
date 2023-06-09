import { CsvFileReader } from "./CsvFileReader";
import { dateStringToDate } from "./utils";
import { MatchResult } from "./MatchResult";

// We create a tuple to define the return value of read()
type MatchData = [Date, string, string, number, number, MatchResult, string];

export class MatchReader extends CsvFileReader<MatchData> {
    mapRow(row: string[]): MatchData {
        return[
            dateStringToDate(row[0]),
            row[1],
            row[2],
            parseInt(row[3]),
            parseInt(row[4]),
            // using "as" is a type assertion, meaning we know what is going on
            // in our code and overrides TypeScript's default behavior
            // we're using this because TS would see row[5] as a string, but
            // we know it is a string containing one of our values written in
            // the MatchResults enum
            row[5] as MatchResult,
            row[6]
        ];
    }
}