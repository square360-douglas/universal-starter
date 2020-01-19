import {ChildProcess, exec} from 'child_process';

const { spawn } = require('child_process');

export class Renderer {

    private _process: ChildProcess;

    private readonly _command = 'npm';
    private readonly _commandOptions = ['run generate:prerender'];

    public start() {

        console.log(__dirname);

        if ( this._process ) {
            console.log('Killing existing render _process');
            this._process.kill();
        }

        try {
            console.log('CWD', process.cwd());
            console.log('PATH', process.env.PATH );

            this._process = spawn(this._command, this._commandOptions, {
                cwd: process.cwd(),
                env: process.env,
                shell: true
            });
        }
        catch (e) {
            console.log('Spawn error: ', e);
            console.log( process.env );
        }

        this._process.stdout.setEncoding('utf8');
        this._process.stdout.on('data', (chunk) => {
            console.log(chunk);
        });

        // _process.stderr.pipe(dest); // since these are streams, you can pipe them elsewhere

        this._process.on('close', (code) => {
            console.log(`Child process exited with code ${code}`);
        });

    }

}





