import { rm } from 'fs/promises';
import { createWriteStream, existsSync } from 'fs';
import { exec } from 'child_process';
import { create as archiver } from 'archiver';
import path from 'path';

// --- Configuration ---
// The folder where Parcel outputs the built application.
const DIST_FOLDER = 'dist';
// The name of the output ZIP file.
const ZIP_OUTPUT_FILE = 'build.zip';
// The entry point for Parcel.
const PARCEL_ENTRY_POINT = 'src/index.html';
// --- End of Configuration ---

const rootDir = path.resolve(__dirname, "..");
const distPath = path.resolve(rootDir, DIST_FOLDER);
const zipPath = path.resolve(rootDir, ZIP_OUTPUT_FILE);

/**
 * Runs a shell command and returns a Promise. Displays output in real-time.
 * @param command The command to execute.
 * @returns A Promise that resolves on successful command completion.
 */
function runCommand(command: string): Promise<void> {
    return new Promise((resolve, reject) => {
        console.log(`\n▶️  Running command: ${command}`);
        const process = exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`❌ Error executing command: ${error.message}`);
                reject(error);
                return;
            }
            if (stderr && !stderr.includes('built in')) { // Parcel often logs to stderr
                console.warn(`Stderr: ${stderr}`);
            }
            resolve();
        });

        // Logging real-time output for better feedback
        process.stdout?.on('data', (data) => console.log(data.toString().trim()));
        process.stderr?.on('data', (data) => console.warn(data.toString().trim()));
    });
}

/**
 * Zips the specified directory into a ZIP archive.
 * @param sourceDir The path to the source directory.
 * @param outPath The path to the output ZIP file.
 * @returns A Promise that resolves on completion of the archiving.
 */
function zipDirectory(sourceDir: string, outPath: string): Promise<void> {
    const archive = archiver('zip', { zlib: { level: 9 } }); // Highest compression
    const stream = createWriteStream(outPath);

    return new Promise((resolve, reject) => {
        console.log(`\n▶️  Creating ZIP archive: ${outPath}`);

        archive
            .directory(sourceDir, false) // `false` means the contents of the folder will be at the root of the ZIP
            .on('error', err => reject(err))
            .pipe(stream);

        stream.on('close', () => {
            const sizeInMB = (archive.pointer() / 1024).toFixed(2);
            console.log(`✅ ZIP archive created successfully. Size: ${sizeInMB} kB`);
            resolve();
        });
        archive.finalize();
    });
}

/**
 * Main function to build and package the project.
 */
async function main() {
    try {
        // 1. Deleting old dist folder
        console.log(`1/3: Checking for and deleting folder: ${distPath}`);
        if (existsSync(distPath)) {
            await rm(distPath, { recursive: true, force: true });
            console.log('✅ The dist folder was successfully deleted.');
        } else {
            console.log('ℹ️  The dist folder does not exist, nothing to delete.');
        }

        // 2. Running Parcel build
        console.log('\n2/3: Running Parcel build...');
        await runCommand(`npx parcel build ${PARCEL_ENTRY_POINT} --no-source-maps`);
        console.log('✅ Parcel build completed successfully.');

        // 3. Zipping the dist folder
        console.log('\n3/3: Zipping the output folder...');
        await zipDirectory(distPath, zipPath);

        console.log('\n🎉 All done! The project has been successfully built and zipped.');

    } catch (error) {
        console.error('\n❌ An unrecoverable error occurred during the build process:', error);
        process.exit(1); // Exit with an error code
    }
}

// Run the script
main();
